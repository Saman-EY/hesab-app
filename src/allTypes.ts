export interface ICustomer {
  _id: string;
  accountant_code: string;
  company: string;
  title: string;
  first_name: string;
  last_name: string;
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
  project: string;
  receipt_kind: string;
  price: number;
  reference: string;
  fee: number;
  createdAt: string; // or Date if parsed
  updatedAt: string; // or Date if parsed
  __v: number;
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
}

export interface IFund {
  _id: string;
  account_code: string;
  title: string;
  description: string;
  branch?: never;
  __v: number;
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
