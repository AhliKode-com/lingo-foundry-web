export default function Education() {
    return(
        <div className="flex gap-[32px]">
            <span>2017 — 2018</span>
            <div className="flex flex-col space-y-[6px]">
                <span className="">Melbourne University</span>
                <span className="text-[#4D4C5C]">Master</span>
                <div className="flex items-center gap-[6px]">
                    <img src="/assets/badge-check-green.svg" alt="icon" className="w-[13px] h-[13px]" />
                    <span className="text-[#067560]">Diploma verified</span>
                </div>
            </div>
        </div>
    )
}