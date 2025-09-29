import { useQuery } from "@tanstack/react-query";
import { api } from "../api";
import Cookies from "js-cookie";

// validate token
export const useGetUser = () => {
    return useQuery({
        queryKey: ["user"],
        queryFn: async () => {
            const token = Cookies.get("token");

            if (!token) {
                throw new Error("No token found");
            }

            const { data } = await api.get("/user", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            return data;
        },
        retry: false,
    });
};

// get all customers
export const useGetAllCustomersQry = () => {
    return useQuery({
        queryKey: ["customers-list"],
        queryFn: async () => {
            const token = Cookies.get("token");

            const { data } = await api.get(`/customer/all`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return data;
        },
        staleTime: 1000 * 60 * 1, // 1 minute
    });
};

// get all receives
export const useGetAllReceivesQry = () => {
    return useQuery({
        queryKey: ["receives-list"],
        queryFn: async () => {
            const { data } = await api.get(`/receipt/getlist`);
            return data;
        },
        staleTime: 1000 * 60 * 1, // 1 minute
    });
};
// get all payments
export const useGetAllPaymentsQry = () => {
    return useQuery({
        queryKey: ["payments-list"],
        queryFn: async () => {
            const { data } = await api.get(`/payment/getlist`);
            return data;
        },
        staleTime: 1000 * 60 * 1, // 1 minute
    });
};

export const useGetAllBanksQry = () => {
    return useQuery({
        queryKey: ["banks-list"],
        queryFn: async () => {
            const { data } = await api.get(`/bank/all`);
            return data;
        },
        staleTime: 1000 * 60 * 1, // 1 minute
    });
};
export const useGetAllVaultsQry = () => {
    return useQuery({
        queryKey: ["vault-list"],
        queryFn: async () => {
            const { data } = await api.get(`/vault/all`);
            return data;
        },
        staleTime: 1000 * 60 * 1, // 1 minute
    });
};
export const useGetAllFundsQry = () => {
    return useQuery({
        queryKey: ["funds-list"],
        queryFn: async () => {
            const { data } = await api.get(`/fund/all`);
            return data;
        },
        staleTime: 1000 * 60 * 1, // 1 minute
    });
};
export const useGetAllProAndServiceQry = (barcode?: string) => {
    return useQuery({
        queryKey: ["product-service-list", barcode],
        queryFn: async () => {
            const { data } = await api.get(`/service/getlist`, {
                params: barcode ? { barcode } : {},
            });
            return data;
        },

        staleTime: 1000 * 60 * 1, // 1 minute
    });
};

export const useGetAllTransfersQry = () => {
    return useQuery({
        queryKey: ["transfers-list"],
        queryFn: async () => {
            const { data } = await api.get(`/transfer/all`);
            return data;
        },
        staleTime: 1000 * 60 * 1, // 1 minute
    });
};
export const useGetAllStorageQry = () => {
    return useQuery({
        queryKey: ["storages-list"],
        queryFn: async () => {
            const { data } = await api.get(`/storage/getlist`);
            return data;
        },
        staleTime: 1000 * 60 * 1, // 1 minute
    });
};
export const useGetAllSellersQry = () => {
    return useQuery({
        queryKey: ["sellers-list"],
        queryFn: async () => {
            const { data } = await api.get(`/seller/all`);
            return data;
        },
        staleTime: 1000 * 60 * 1, // 1 minute
    });
};
export const useGetAllProjectsQry = () => {
    return useQuery({
        queryKey: ["projects-list"],
        queryFn: async () => {
            const { data } = await api.get(`/project/all`);
            return data;
        },
        staleTime: 1000 * 60 * 1, // 1 minute
    });
};
export const useGetAllSalesQry = (isEnable: boolean = true) => {
    return useQuery({
        queryKey: ["sales-list"],
        queryFn: async () => {
            const { data } = await api.get(`/factore/all`);
            return data;
        },
        staleTime: 1000 * 60 * 1, // 1 minute
        enabled: isEnable,
    });
};
export const useGetAllSalesReturnQry = (isEnable: boolean = true) => {
    return useQuery({
        queryKey: ["sales-return-list"],
        queryFn: async () => {
            const { data } = await api.get(`/saleback/all`);
            return data;
        },
        staleTime: 1000 * 60 * 1, // 1 minute
        enabled: isEnable,
    });
};
export const useGetAllBuyQry = (isEnable: boolean = true) => {
    return useQuery({
        queryKey: ["buy-list"],
        queryFn: async () => {
            const { data } = await api.get(`/buyfactore/all`);
            return data;
        },
        staleTime: 1000 * 60 * 1, // 1 minute
        enabled: isEnable,
    });
};
export const useGetAllBuyReturnQry = (isEnable: boolean = true) => {
    return useQuery({
        queryKey: ["buy-return-list"],
        queryFn: async () => {
            const { data } = await api.get(`/buyback/all`);
            return data;
        },
        staleTime: 1000 * 60 * 1, // 1 minute
        enabled: isEnable,
    });
};

export const useGetExchangesQry = () => {
    return useQuery({
        queryKey: ["exchanges-list"],
        queryFn: async () => {
            const { data } = await api.get(`/currency/all`);
            return data;
        },
        staleTime: 1000 * 60 * 1, // 1 minute
    });
};

export const useGetUsersQry = () => {
    return useQuery({
        queryKey: ["users-list"],
        queryFn: async () => {
            const { data } = await api.get(`/user/all`);
            return data;
        },
        staleTime: 1000 * 60 * 1,
    });
};

export const useGetDraftsQry = () => {
    return useQuery({
        queryKey: ["draft-list"],
        queryFn: async () => {
            const { data } = await api.get(`/draft/all`);
            return data;
        },
        staleTime: 1000 * 60 * 1,
    });
};
export const useGetCategoriesQry = () => {
    return useQuery({
        queryKey: ["categories-list"],
        queryFn: async () => {
            const { data } = await api.get(`/categories/category`);
            return data;
        },
        staleTime: 1000 * 60 * 1,
    });
};
// export const useGetSubCategoriesQry = () => {
//     return useQuery({
//         queryKey: ["categories-list"],
//         queryFn: async () => {
//             const { data } = await api.get(`/categories/subcategory`);
//             return data;
//         },
//         staleTime: 1000 * 60 * 1,
//     });
// };
