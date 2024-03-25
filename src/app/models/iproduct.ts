export interface IProduct {
  _id: string;
  name: string;
  description: string;
  images: string[];
  brand: string;
  price: number;
  quantity_in_stock: number;
  vendor_id?: string;
  subcategory_id: string;
}
