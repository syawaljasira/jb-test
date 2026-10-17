import FormInput from "../FormInput";

interface FormProps {
  kind: "name" | "email";
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  error: string;
}

export function FormSlide({
  kind,
  value,
  onChange,
  onSubmit,
  error,
}: FormProps) {
  const isName = kind === "name";
  const placeholder = isName ? "First name" : "Email address";

  return (
    <div className="relative flex px-8">
      <div className="flex flex-col w-full h-full">
        <p className="w-full text-lg text-light text-center font-bagoss">
          {isName
            ? "Let’s start with the basics. Type in your first name."
            : "How should we contact you? Type in your email address."}
        </p>

        <form
          className="mt-12 text-left [@media(max-height:700px)]:mt-6"
          id={`${kind}-form`}
          onSubmit={(event) => {
            event.preventDefault();
            onSubmit();
          }}
          noValidate
        >
          <FormInput
            kind={kind}
            isName={isName}
            id={`${isName ? "text" : "email"}-input`}
            type={isName ? "text" : "email"}
            inputMode={isName ? "text" : "email"}
            placeholder={placeholder}
            required
            value={value}
            onChange={(event) => onChange(event.target.value)}
            error={error}
          />
        </form>
      </div>
    </div>
  );
}
