export interface ICustomer {
  _id: string;
  accountant_code: string;
  company: string;
  title: string;
  first_name: string;
  last_name: string;
  nickname: string;
  kindofbusiness: string;
  address: string;
  telphone: string;
  phone: string;
  fax: string;
  email: string;
  site: string;
  bank: string;
  bank_number: string;
  cart_number: string;
  ir_code: string;
  money_ineventory: string;
  price_list: string;
  tax_type: string;
  national_code: string;
  economic_code: string;
  branch_code: string;
  register_number: string;
  description: string;
  createdAt: string; // could also be `Date` if you parse it
  updatedAt: string; // same here
  __v: number;
}

export interface IReceive {
  _id: string;
  code: string;
  date: string; // or Date if you parse it
  project: any;
  money: string;
  receipt_kind: string;
  price: number;
  reference: string;
  fee: number;
  createdAt: string; // or Date if parsed
  updatedAt: string; // or Date if parsed
  __v: number;
  description?: string;
  customer?: any;
}
export interface IPayment {
  _id: string;
  code: string;
  date: string; // ISO date string
  project: any;
  payment_kind: string;
  price: number;
  reference: string;
  fee: number;
  customer?: any;
  description?: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
  money?: string;
}

export interface IBank {
  _id: string;
  account_code: string;
  title: string;
  account_number: string;
  branch: string;
  cart_number: string;
  shaba_number: string;
  account_user_name: string;
  pos_number: string;
  description: string;
  phone_number_inbank: string;
  switch_number_payment: string;
  terrminal_number_payment: string; // typo? maybe "terminal_number_payment"
  shop_number: string;
  __v: number;
  money?: string;
}

export interface IFund {
  _id: string;
  account_code: string;
  title: string;
  description: string;
  branch?: never;
  __v: number;
  money?: string;
}

export interface IVault {
  _id: string;
  account_code: string;
  title: string;
  description: string;
  switch_number_payment: string;
  terrminal_number_payment: string;
  shop_number: string;
  branch?: never;
  __v: number;
  money?: string;
}

export interface IStorage {
  _id: string;
  code: string;
  title: string;
  storage_keeper: string;
  phone: number;
  address: string;
  __v: number;
}

export interface IProductAndService {
  category: "product";
  _id: string;
  accountant_code: string;
  title: string;
  product_code: string;
  barcode: string;
  sell_price: number;
  sell_description: string;
  buy_price: number;
  buy_description: string;
  stock: number;
  img: string;
  __v: number;

  sell_tax: string;
  buy_tax: string;
  tax_type: string;
  tax_code: number;
  tax_unit: string;
}

export interface ITransaction {
  _id: string;
  number: string;
  date: string;
  project: any;
  description: string;
  from_kind: "bank" | "vault" | "fund" | string;
  to_kind: "bank" | "vault" | "fund" | string;
  from_bank: any;
  to_bank: any;
  from_vault: any;
  to_vault: any;
  from_fund: any;
  to_fund: any;
  price: number;
  fee: number;
  referral: string;
  __v: number;
}

export interface ISeller {
  _id: string;
  accountant_code: string;
  name: string;
  refund_price: number;
  refund_percentage: number;
  sell_price: number;
  description: string;
  __v: number;
}

export interface IProject {
  _id: string;
  title: string;
  __v: number;
}

export interface IProduct {
  _id: string;
  accountant_code: string;
  title: string;
  product_code: string;
  barcode: string;
  stock: number;
  category: string;
  sell_tax: string;
  buy_tax: string;
  tax_type: string;
  tax_code: number;
  tax_unit: string;
  __v: number;
}

export interface IProductItem {
  _id: string;
  product: IProduct;
  price: number;
  tax: number;
  all_price: number;
  count: number;
  description: string;
  discount: number;
}

export interface ISaleFactor {
  _id: string;
  code: string;
  customer: ICustomer; //
  date: string; // ISO date string
  receipt_date: string; // ISO date string
  project: IProject;
  seller: ISeller;
  title: string;
  money: string;
  status?: string;
  description: string;
  vault: IStorage; //
  products: IProductItem[];
  transportation_cost: number;
  transportation_guy: ICustomer; //
  __v: number;
  final_price?: number;
}
export interface IBuyFactor {
  _id: string;
  code: string;
  date: string; // ISO date string
  receipt_date: string; // ISO date string
  project: IProject;
  sponser: ISeller;
  title: string;
  money: string;
  status?: string;
  description: string;
  vault: IStorage; //
  products: IProductItem[];
  transportation_cost: number;
  transportation_guy: ICustomer; //
  __v: number;
  final_price?: number;
}
