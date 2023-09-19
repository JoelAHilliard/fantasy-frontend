import Hoff from "./Hoff";
import Quote from "./Quote"
import Poll from './Poll'
import WeeklyBreakdown from "./WeeklyBreakdown";
import Phaucette from "./Phaucette";

function LandingPage(){
    return(

        <div className="p-4">
          <WeeklyBreakdown></WeeklyBreakdown>

          <Quote></Quote>
          <div className="flex flex-row w-full gap-4">
            <Hoff></Hoff>
            <Phaucette></Phaucette>
          </div>
          
          <Poll></Poll>

        </div>
    )
}

export default LandingPage;