
# Create your views here.
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from base.models import Item
from base.serializers import ItemSerializer


@api_view(['GET'])
def getItems(request):
    items = Item.objects.all()
    serializer = ItemSerializer(items, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getItem(request, pk):
    item = Item.objects.get(_id=pk)
    serializer = ItemSerializer(item, many=False)
    return Response(serializer.data)


#

@api_view(['POST'])
@permission_classes([IsAdminUser])
def createItem(request):
    user = request.user

    item = Item.objects.create(
        user=user,
        title='Sample Name',
        price=0,
        # brand='Sample Brand',
        countInStock=0,
        preparationTime=0,
        category='Sample Category',
        desc=''
    )

    serializer = ItemSerializer(item, many=False)
    return Response(serializer.data)




@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateItem(request, pk):
    data = request.data
    item = Item.objects.get(_id=pk)


    # print(data['title'])
    item.title = data['title']
    item.price = data['price']
    item.countInStock = data['countInStock']
    item.preparationTime = data['preparationTime']
    item.category = data['category']
    item.desc = data['desc']

    item.save()

    serializer = ItemSerializer(item, many=False)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteItem(request, pk):
    item = Item.objects.get(_id=pk)
    item.delete()
    return Response('Item Deleted')




@api_view(['POST'])
def uploadImage(request):
    data = request.data

    item_id = data['item_id']
    item = Item.objects.get(_id=item_id)

    item.image = request.FILES.get('image')
    item.save()

    return Response('Image was uploaded')


