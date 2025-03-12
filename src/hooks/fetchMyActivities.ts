import { useQuery } from "@tanstack/react-query";
import  usePaginationStore  from "../stores/usePaginationStore";

//내 체험 리스트 조회 api


//api fetch
const fetchItems = async(cursorId: number, pageSize:number) => {

    const response = await fetch(`https://sp-globalnomad-api.vercel.app/12-2/my-activities?cursorId=${cursorId}&size=${pageSize}`);
    const data = await response.json();
    return data;

};

const useFetchItems = ()=>{
    const { currentPage, pageSize, setTotalPages} = usePaginationStore();

    return useQuery({
        queryKey : ['items', currentPage],
        queryFn: async() => {
            const response = await fetchItems(currentPage, pageSize);

            if (response.totalCount !== undefined){
                setTotalPages(Math.ceil(response.totalCount/pageSize));
            }
            return response.activities;
        
        },
        placeholderData: (previousData) => previousData,
        staleTime: 1000 * 60 * 5,
    

    });
};

export default useFetchItems;