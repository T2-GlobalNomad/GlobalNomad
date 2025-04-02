"use client"
import Input from "../customInputs/customInput";
import { useActivityStore } from "@/stores/useActivityStore";
import { useState } from "react";
import styles from './PriceInput.module.css'

 

export default function PriceInput (){
    const { activity, setActivity } = useActivityStore(); // Zustand 상태 가져오기
    const [displayPrice, setDisplayPrice] = useState(
        activity.price?.toLocaleString() || ""
    );


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value.replace(/,/g, "");

        if (!/^\d*$/.test(rawValue)) return;

        const numberValue = Number(rawValue);

        setActivity({ price: numberValue});
        setDisplayPrice(rawValue === "" ? "" : numberValue.toLocaleString());
    }

    return(
        <div className={styles.inputWrapper}>
            <p className={styles.priceTitle}>가격</p>
            <Input
                placeholder="가격"
                id="price"
                type="text"
                value={displayPrice}
                onChange={handleChange}
                className={styles.priceInput}
                />
            
        </div>

    )
}
