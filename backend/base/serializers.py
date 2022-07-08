from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken

from .models import Item, Order, OrderItem, TableInfo, CurrentOrder


class CurrentOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = CurrentOrder
        fields = '__all__'


class TableInfoSerializer(serializers.ModelSerializer):
    currentOrder=serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = TableInfo
        fields = '__all__'

    def get_currentOrder(self, obj):
        # print(obj.currentOrder)
        currentOrder = obj.currentOrder
        serializer = CurrentOrderSerializer(currentOrder, many=False)
        return serializer.data


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item  # the model we want to serialize
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    # custom fields
    name = serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', '_id', 'username', 'email', 'name', 'isAdmin']

    def get__id(self, obj):
        return obj.id

    def get_isAdmin(self, obj):
        return obj.is_staff

    def get_name(self, obj):
        name = obj.first_name
        if name == '':
            name = obj.email
        return name


#

class UserSerializerWithToken(UserSerializer):
    # we will extend UserSerializer and we will have all the same attributes as that
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', '_id', 'username', 'email', 'name', 'isAdmin', 'token']

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)


class OrderItemSerializer(serializers.ModelSerializer):
    items = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = OrderItem
        fields = '__all__'

    def get_items(self, obj):
        items = obj.item
        serializer = ItemSerializer(items, many=False)
        return serializer.data


class OrderSerializer(serializers.ModelSerializer):
    orderItems = serializers.SerializerMethodField(read_only=True)
    user = serializers.SerializerMethodField(read_only=True)
    tableInfo = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Order
        fields = '__all__'

    def get_orderItems(self, obj):
        # print("1",self)
        # print("2",obj)  obj is ur order
        # print("3",obj.orderitem_set.all())
        items = obj.orderitem_set.all()
        serializer = OrderItemSerializer(items, many=True)
        return serializer.data

    def get_user(self, obj):
        user = obj.user
        serializer = UserSerializer(user, many=False)
        return serializer.data

    #
    def get_tableInfo(self, obj):
        table = obj.tableinfo
        # since one to one field hai

        # print("1",self)

        # print("2",obj)
        # print("3",tableInfo)
        # print("4",tableInfo.order)

        serializer = TableInfoSerializer(table, many=False)
        return serializer.data
