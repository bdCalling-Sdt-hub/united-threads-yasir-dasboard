/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import AddNewProduct from "./AddNewProduct";

const AddProductContainer = () => {
  //const [size, setSize] = useState([]);
  //const [form] = Form.useForm();
  //const [error, setError] = useState("");
  //const { data, isLoading } = useGetCategoriesQuery({});

  //const categories = data as TResponse<TCategory[]>;
  //const categoriesOptions = categories?.data?.map((category) => ({
  //  label: category.name,
  //  value: category._id,
  //}));

  //const onSelectSize: GetProp<typeof Checkbox.Group, "onChange"> = (checkedValues) => {
  //  console.log("checked = ", checkedValues);
  //  setSize(checkedValues as []);
  //  console.log(size);
  //};

  //const [addProduct] = useAddProductMutation();

  //const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
  //  console.log(values);
  //  try {
  //    const formData = new FormData();

  //    formData.append("data", JSON.stringify(values));

  //    console.log({ values });

  //    //const res = await addProduct(formData).unwrap();
  //    //if (res.success) {
  //    //  form.resetFields();
  //    //} else {
  //    //  setError(res.message);
  //    //}
  //  } catch (error: any) {
  //    setError(error.message || "Something went wrong");
  //  }
  //};

  return (
    <div>
      <h1 className='text-2xl font-bold w-full'>Add Product </h1>
      {/* product add from */}
      <AddNewProduct />
    </div>
  );
};

export default AddProductContainer;
