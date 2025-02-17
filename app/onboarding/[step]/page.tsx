import StepOne from "@/app/components/StepOne";
import StepTwo from "@/app/components/StepTwo";
import StepThree from "@/app/components/StepThree";

interface RouteParams {
    params: Promise<{ step: string }>;
};

export default async function Onboarding({ params }: RouteParams) {
    const { step } = await params;
    console.log(step);

    let content;

    switch (step) {
        case '1' :
          content = <StepOne />;
          break;
        case '2' :
          content = <StepTwo />;
          break;
        case '3' :
          content = <StepThree />
          break;
        default:
          content = <div>Invalid Step</div>          
    };

    return(
        <div>
          <h1>Onboarding step: {step}</h1>
          {content}
        </div>
    )
}