import { useFormik } from "formik";
import * as Yup from "yup";
import TxtInput from "../../components/TxtInput";
import { useGetExchangesQry } from "../../hooks/queries";
import { useUpdateExchange } from "../../hooks/mutation";
import { useQueryClient } from "@tanstack/react-query";

const currencies = [
    { name: "USDtoRial", label: "ریال", display: "دلار آمریکا", format: true },
    { name: "CADtoRial", label: "ریال", display: "دلار کانادا", format: true },
    { name: "AEDtoRial", label: "ریال", display: "درهم امارات", format: true },
    { name: "OMRtoRial", label: "ریال", display: "ریال عمان", format: true },
    { name: "EURtoRial", label: "ریال", display: "یورو", format: true },
];

type CurrencyRates = {
    USDtoRial: number;
    CADtoRial: number;
    AEDtoRial: number;
    OMRtoRial: number;
    EURtoRial: number;
};

function ExchangeRate() {
    // const { mutate: createApi, isPending } = useCreateExchange();
    const { mutate: updateApi, isPending: isPending2 } = useUpdateExchange();
    const { data } = useGetExchangesQry();

    const queryClient = useQueryClient();

    const currencyArray = data?.currency;

    const obj: CurrencyRates = currencyArray?.reduce((acc, item) => {
        acc[item.to] = item.amount;
        return acc;
    }, {} as Record<string, number>);

    const formik = useFormik({
        initialValues: {
            USDtoRial: obj?.USDtoRial || "",
            CADtoRial: obj?.CADtoRial || "",
            AEDtoRial: obj?.AEDtoRial || "",
            OMRtoRial: obj?.OMRtoRial || "",
            EURtoRial: obj?.EURtoRial || "",
        },
        validationSchema: Yup.object({
            USDtoRial: Yup.string().required("الزامی است"),
            CADtoRial: Yup.string().required("الزامی است"),
            AEDtoRial: Yup.string().required("الزامی است"),
            OMRtoRial: Yup.string().required("الزامی است"),
            EURtoRial: Yup.string().required("الزامی است"),
        }),
        enableReinitialize: true,
        onSubmit: (values) => {
            const currencies = Object.entries(values).map(([key, value]) => ({
                to: key,
                amount: value,
            }));
            const body = {
                currencies: currencies,
            };

            // if (!currencyArray.length) {
            //   // create
            //   createApi(body, {
            //     onSuccess: () => {
            //       queryClient.invalidateQueries({ queryKey: ["exchanges-list"] });
            //     },
            //   });
            // } else {
            //   // update
            //   updateApi(body, {
            //     onSuccess: () => {
            //       queryClient.invalidateQueries({ queryKey: ["exchanges-list"] });
            //     },
            //   });
            // }

            updateApi(body, {
                onSuccess: () => {
                    queryClient.invalidateQueries({ queryKey: ["exchanges-list"] });
                },
            });
        },
    });

    return (
        <section className="h-[86dvh] my-auto md:my-0 w-full border border-gray-300 rounded-lg shadow p-5 overflow-auto">
            <section className="flex flex-col gap-4 w-full max-w-90  mx-auto mt-6">
                {currencies.map((cur) => (
                    <div key={cur.name} className="flex items-center gap-5">
                        <TxtInput
                            className="!col-span-3 md:!col-span-1"
                            type="text"
                            formik={formik}
                            name={cur.name}
                            label={cur.label}
                            formatWithComma={cur.format} // optional formatting
                        />
                        <span className="text-3xl">=</span>
                        <div className="w-full mx-auto flex flex-col col-span-2 md:col-span-1 cursor-not-allowed">
                            <span className="text-sm mb-2 text-gray-700">{cur.display}</span>
                            <label className="input input-ghost !border border-gray-300 w-full bg-gray-100 cursor-not-allowed">
                                <input
                                    className="opacity-100 disabled:!opacity-100 disabled:text-black disabled:cursor-not-allowed"
                                    disabled
                                    type="text"
                                    value="1"
                                />
                            </label>
                        </div>
                    </div>
                ))}

                <button
                    onClick={() => formik.submitForm()}
                    disabled={isPending2}
                    className="btn md:col-span-2 bg-sky-600 text-white w-full max-w-80 md:max-w-none mx-auto mt-5"
                >
                    ثبت
                </button>
            </section>
        </section>
    );
}

export default ExchangeRate;

// title: "EUR - یورو",
// title: "CAD - دلار کانادا",
// title: "OMR - ریال عمان",
// title: "USD - دلار آمریکا",
// title: "AED - درهم امارات متحده عربی",
