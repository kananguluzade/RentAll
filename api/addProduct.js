// api/addProduct.js

export default async function handler(req, res) {
  if (req.method === "POST") {
    const newProduct = req.body;

    // Başarıyla eklenen ürün için geçici bir yanıt döndürün
    res.status(200).json({
      message: "Product added successfully",
      data: newProduct,
    });
  } else if (req.method === "GET") {
    // Örnek ürünler ile listeleme işlemi için geçici yanıt
    res.status(200).json([
      {
        id: "1",
        title: "Sample Product 1",
        category: "Elektronika",
        place: "Bakı, Yasamal rayonu",
        owner_id: "user_123",
        image: "/test.png",
        otherImages: [],
        content: "This is a sample product description.",
      },
      {
        id: "2",
        title: "Sample Product 2",
        category: "Avtomobillər",
        place: "Bakı, Binəqədi rayonu",
        owner_id: "user_456",
        image: "/test2.png",
        otherImages: [],
        content: "Another sample product for testing.",
      },
    ]);
  } else {
    // Yalnızca POST ve GET metodlarına izin verir
    res.setHeader("Allow", ["POST", "GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
