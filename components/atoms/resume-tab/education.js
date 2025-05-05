import {getEnums} from "@/apis/getEnum";

export default function Education({data}) {
    const { data: enums } = getEnums();
    const typeMatch = enums.level.find(typeItem => typeItem.name === data.type)?.displayName;
    return(
        <div className="flex gap-[32px]">
            <span>{data.startYear} — {data.endYear}</span>
            <div className="flex flex-col space-y-[6px]">
                <span className="">{data.issuedBy}</span>
                <span className="text-[#4D4C5C]">{typeMatch}</span>
                <div className="flex items-center gap-[6px]">
                    <img src="/assets/badge-check-green.svg" alt="icon" className="w-[13px] h-[13px]" />
                    <span className="text-[#067560]">verified</span>
                </div>
            </div>
        </div>
    )
}