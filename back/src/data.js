const products = [
    {
    "id": 1034567892,
    "storeId": '1',
    "name": "Pizza napolitana",
    "price": "24.990",
    "rating": "60",
    "description": "Este tipo de pizza tiene una masa suave y esponjosa, con un grosor medio, por lo que no es crujiente pero no peca de tener demasiada masa, simplemente lleva la masa perfecta. Este clásico manjar sólo debe llevar tomate, queso, albahaca y aceite de oliva.",
    "image": "https://images.pexels.com/photos/1146760/pexels-photo-1146760.jpeg?auto=compress&cs=tinysrgb&w=300",
},
{
    "id": 1034567893,
    "storeId": '1',
    "name": "Pizza vegetariana",
    "price": "43.750",
    "rating": "80",
    "description": "Veggiña. Salsa de tomate, VeggiCheese Violife, champiñón, pimiento verde, cebolla, aceitunas negras y tomate natural.",
    "image": "https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&w=300",

},
{
    "id": 1034567894,
    "storeId": '2',
    "name": "Pizza Siciliana",
    "price": "39.900",
    "rating": "95",
    "description": "A diferencia de la pizza napolitana, la masa de este tipo de pizza es más gruesa y se asemeja un poco al pan, por lo que en muchos lugares simplemente le llaman pizza de masa gorda, aunque originalmente llevaba el nombre de Sfincione.",
    "image": "https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&w=300",

},
{
    "id": 1034567895,
    "storeId": '3',
    "name": "Pizza New York",
    "price": "39.900",
    "rating": "75",
    "description": "La pizza New York es famosa por tener una masa delgada pero no crujiente que puede llevarse en la mano y doblar para comerse, además es la reina en cuanto al tipo de ingredientes que introdujo",   
    "image": "https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&w=300",
},
{
    "id": 1034567896,
    "storeId": '4',
    "name": "Pizza Chicago",
    "price": "39.900",
    "rating": "45",
    "description":"Conocida en muchos lugares como pizza de sartén o deep dish, la verdadera Chicago se asemeja mucho a un pay, ya que su preparación en una cacerola metálica le brinda su peculiar forma.",
    "image": "https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&w=300",
}

];

 const stores = [
    {
        id:'1',
        imageSrc: 'https://images.rappi.com/restaurants_logo/urban-pizza-logo1-1567190280858-1605190879805.png?e=webp&d=10x10&q=10',
        name: 'Urban Pizzería',
        address: 'Carrera 43E #11A - 34 - Barrio Manila, Medellin',
        rating: 4.5
    },
    {
        id:'2',
        imageSrc: 'https://images.rappi.com/restaurants_logo/harrys-pizza-logo1-1612903715560.png?e=webp&d=10x10&q=10',
        name: 'Harrys Pizza',
        address: 'Cq. 1 #70-33, Medellín',
        rating: 3.8
    }
    ,
    {
        id:'3',
        imageSrc: 'https://images.rappi.com/restaurants_logo/1-1566949585753-1609853900928.png?e=webp&d=10x10&q=10',
        name: "Domino's - Pizza",
        address: 'Calle 52 #43-26',
        rating: 4.1
    },
    {
        id:'5',
        imageSrc: 'https://images.rappi.com/restaurants_logo/81ebdcc7-2af9-4ead-bf70-7c6cee039569-1571272784589.png?e=webp&d=10x10&q=10',
        name: "Angelo pizzería",
        address: 'Calle 12 #31-165',
        rating: 4.3
    }
];

module.exports = {products, stores}