/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { ChangeEventHandler } from "react";
import { Input as AndInput, InputProps } from "antd";
import { CompoundedComponent } from "antd/es/float-button/interface";

type Props<T> = {
  color: "outline";
  className: string;
  placeholder: string;
  prefix?: JSX.Element;
  autoComplete: string;
  style?: React.CSSProperties;
  Password: boolean;
  textarea: boolean;
  onChange?: ChangeEventHandler<T> | undefined;
} & CompoundedComponent &
  InputProps;

const Input = (props: Partial<Props<any>>) => {
  const bgColor =
    (props.color === "outline" && "bg-white") || "bg-white";

  return (
    <>
      {props.Password && (
        <AndInput.Password
          {...props}
          placeholder={props.placeholder}
          className={`${bgColor} text-black ${props.className} inp h-[40px]`}
        />
      )}
      {!props.Password && !props.textarea && (
        <AndInput
          {...props}
          placeholder={props.placeholder}
          className={`${bgColor} text-black ${props.className} h-[40px]`}
        />
      )}
      {props.textarea && (
        //@ts-ignore
        <AndInput.TextArea
          rows={4}
          {...props}
          placeholder={props.placeholder}
          className={`${bgColor} text-black ${props.className}`}
        />
      )}
    </>
  );
};

export default Input;
