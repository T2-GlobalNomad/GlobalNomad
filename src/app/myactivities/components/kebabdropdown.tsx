"use client"
import { useRouter } from "next/router"


import Dropdown from "@/components/Dropdown"

export default function KebabDropdown(){
    const router = useRouter();


    return(
        <div>
            <Dropdown selected="체험등록하기" options={["수정하기", "삭제하기"]} 
            onChange={(value)=>
            {
                if (value === '수정하기'){
                    router.push('/eidt/page.tsx')
                } else if (value === '삭제하기'){
                    // 삭제하기 모달창 팝업
                }
            }
            }>
                
            </Dropdown>
        </div>
    )
}