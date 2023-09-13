import Hoff from "./Hoff";
import Quote from "./Quote"
import Poll from './Poll'
import WeeklyBreakdown from "./WeeklyBreakdown";

function LandingPage(){
    return(

        <div className="p-4">

          <Quote></Quote>
          <Hoff></Hoff>
          <WeeklyBreakdown></WeeklyBreakdown>
          <Poll></Poll>

        </div>
    )
}

export default LandingPage;