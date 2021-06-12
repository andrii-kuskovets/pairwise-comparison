import React, { useState, FocusEvent } from "react";
import "./_form.scss";

interface FormProps {
  onAdd(title: string): void;
}

export const Form: React.FC<FormProps> = (props) => {
  const [value, setValue] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    if (value === "") {
      setError(true);
    } else {
      props.onAdd(value);
      setValue("");
    }
  };

  const focusHandler = (event: FocusEvent<any>) => {
    event.preventDefault();
    setError(false);
  };

  return (
    <form className="form" onSubmit={submitHandler}>
      <div className={error ? "form__group form__group_error" : "form__group"}>
        {/*<label htmlFor="new-item">New item</label>*/}
        <input
          onChange={changeHandler}
          onFocus={focusHandler}
          type="text"
          name="new-item"
          id="new-item"
          placeholder="New item"
          value={value}
        />
        <span>Required</span>
      </div>
      <button className="form__btn">Add</button>
    </form>
  );
};
