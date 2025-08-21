import { memo } from "react";

const TextInput = (props) => {
  const {label,registration,isMaxLength = 20,type = "text", error}=props
  return (
    <div className="mb-3">
      <label className="form-label">{label}</label>
  
        <input
          type={type}
          className={`form-control ${error ? "is-invalid" : ""}`}
          maxLength={isMaxLength}
          {...registration}
        />
  
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default memo(TextInput);
