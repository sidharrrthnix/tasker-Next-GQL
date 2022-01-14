import { useRouter } from "next/router";
import React, { useState } from "react";
import { useUpdateTaskMutation } from "../generated/graphql-frontend";
interface Values {
  title: string;
}
interface Props {
  id: number;
  initialValues: Values;
}
const UpdateTaskForm: React.FC<Props> = ({ id, initialValues }) => {
  const [values, setValues] = useState<Values>(initialValues);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };
  const router = useRouter();
  const [updateTask, result] = useUpdateTaskMutation();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await updateTask({
        variables: { input: { id, title: values.title } },
      });
      if (res.data?.updateTask) {
        router.push("/");
      }
    } catch (e) {}
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        {result.error && <p className="alert-error">{result.error.message}</p>}
        <p>
          <label className="field-label">Title</label>
          <input
            type="text"
            name="title"
            className="text-input"
            value={values.title}
            onChange={handleChange}
          />
        </p>
        <p>
          <button className="button" type="submit" disabled={result.loading}>
            {result.loading ? "Loading" : "Save"}
          </button>
        </p>
      </form>
    </div>
  );
};

export default UpdateTaskForm;
