import styles from "./index.module.css";
import Input from "@/components/Input/Input";
import PasswordInput from "@/components/Input/PasswordInput";
import SelectInput from "@/components/Input/SelectInput";
import DateInput from "@/components/Input/DateInput";

export default function Page() {
  return (
    <div className={styles.container}>
      <div>
        <Input
          id="email"
          type="text"
          placeholder="이메일을 입력해주세요"
          label="이메일"
        />
      </div>
      <div>
        <Input
          id="email"
          type="text"
          placeholder="이메일을 입력해주세요"
          label="이메일"
          labelSize="large"
        />
      </div>
      <div>
        <PasswordInput />
      </div>
      <div>
        <SelectInput />
      </div>
      <div className={styles.subContainer}>
        <DateInput id="date" label="날짜" />
      </div>
    </div>
  );
}
