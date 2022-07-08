from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from base.models import Item, Order, OrderItem, TableInfo, CurrentOrder
from base.serializers import ItemSerializer, OrderSerializer, TableInfoSerializer

from rest_framework import status
from datetime import datetime


@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def getTableInfo(request):
    tableinfo = TableInfo.objects.all()
    serializer = TableInfoSerializer(tableinfo, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def makeTableAvailable(request,pk):
    data=request.data
    print("jo")
    print(data)
    for table in TableInfo.objects.filter(tableNo=data['tableNo']):
        # print("ss",table.currentOrder)
        # print(table.availability_status)
        table.availability_status=True
        # print(table.availabilty_status)
        currObj=table.currentOrder
        if(table.currentOrder!=None):
            print ("a",currObj)
            currObj.delete()
            print("b",currObj)
            # currObj.save()
            # table.save()

            # currObj.save()

        # table.currentOrder.delete()
    # table = TableInfo.objects.get(tableNo=data['tableNo'])
    # print("ss",table)
    # Post.objects.filter(pub_date__gt=datetime.now()).delete()
    return Response('table was marked as available')


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrderItems(request):
    user = request.user
    data = request.data
    # print(data)

    orderItems = data['orderItems']

    if orderItems and len(orderItems) == 0:
        return Response({'detail': 'No Order Items'}, status=status.HTTP_400_BAD_REQUEST)
    else:

        # (1) Create order and CurrentOrder

        order = Order.objects.create(
            user=user,
            paymentMethod=data['paymentMethod'],
            taxPrice=data['taxPrice'],
            shippingPrice=data['shippingPrice'],
            totalPrice=data['totalPrice']
        )

        currentOrder = CurrentOrder.objects.create(
            user=user,
            paymentMethod=data['paymentMethod'],
            taxPrice=data['taxPrice'],
            totalPrice=data['totalPrice']
        )


        # (2) Create tableInfo
        tableInfo = TableInfo.objects.create(
            order=order,
            currentOrder=currentOrder,
            tableNo=data['tableNo'],
            availability_status=False
        )


    # (3) Create order items and set order to orderItem relationship
    for i in orderItems:
        product = Item.objects.get(_id=i['product'])

        item = OrderItem.objects.create(
            item=product,
            order=order,
            name=product.title,
            qty=i['qty'],
            price=i['price'],
            image=product.image.url,
        )

        # (4) Update stock

        product.countInStock -= item.qty
        product.save()

    serializer = OrderSerializer(order, many=False)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyOrders(request):
    user = request.user
    orders = user.order_set.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getOrders(request):
    orders = Order.objects.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrderById(request, pk):
    user = request.user

    try:
        order = Order.objects.get(_id=pk)
        if user.is_staff or order.user == user:
            serializer = OrderSerializer(order, many=False)
            return Response(serializer.data)
        else:
            Response({'detail': 'Not authorized to view this order'},
                     status=status.HTTP_400_BAD_REQUEST)
    except:
        return Response({'detail': 'Order does not exist'}, status=status.HTTP_400_BAD_REQUEST)


# if order does not exist at all


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateOrderToPaid(request, pk):

    # data=request.data
    # print (data)
    order = Order.objects.get(_id=pk)

    order.isPaid = True
    order.paidAt = datetime.now()
    order.save()

    return Response('Order was paid')


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateOrderToDelivered(request, pk):
    order = Order.objects.get(_id=pk)

    order.isDelivered = True
    order.deliveredAt = datetime.now()
    order.save()

    return Response('Order was delivered')
