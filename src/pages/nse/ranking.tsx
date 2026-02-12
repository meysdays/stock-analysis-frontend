import MarketTable from "../../components/MarketTable/MarketTable"
import SidePanel from "../../components/Navigation/SidePanel"

const RankingPage = () => {
  return (
    <div className="flex h-full bg-[#FDFDFD] overflow-y-auto">
      <SidePanel name="NSE" />
      <MarketTable/>
    </div>
  )
}

export default RankingPage