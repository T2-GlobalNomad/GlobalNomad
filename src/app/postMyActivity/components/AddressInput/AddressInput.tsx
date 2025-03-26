"use client"
import Input from "../customInputs/customInput"
import styles from "./AddressInput.module.css"
import { useActivityStore } from "@/stores/useActivityStore"

export default function AddressInput (){
    const { activity, setActivity } = useActivityStore()


    return(
        <div className={styles.container}>
            <p className={styles.title}>주소</p>
            <Input
                placeholder="주소"
                id="address"
                type="string"
                value={activity.address}
                onChange={(e) => setActivity({ address: e.target.value })}
              />
        </div>

    )
}