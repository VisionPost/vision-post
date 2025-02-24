import StepOne from "@/app/components/StepOne";
import StepTwo from "@/app/components/StepTwo";
import StepThree from "@/app/components/StepThree";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";

interface RouteParams {
    params: Promise<{ step: string }>;
};

export default async function Onboarding({ params }: RouteParams) {
    const { step } = await params;
    const currentStep = Number(step);
    const totalSteps = 3;

    const progress = (currentStep / totalSteps) * 100;

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
        <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
          <div className="w-full bg-blue-600 text-white text-center px-4 py-2 fixed top-0">
            <p className="text-[14px] font-medium">Boost your developer branding with VisionPost  🚀</p>
          </div>

          <div className="-mt-2">
            <Image 
              src="/logo.png"
              alt="logo"
              width={150}
              height={150}
            />
          </div>

          <div className="max-w-2xl w-full bg-black border-none text-white p-8">
            <div className="mb-4">
              <Progress value={progress}
              className="h-1 bg-gray-800 [&>*]:bg-blue-600"
              />
              <div className="flex justify-between mt-2 text-sm text-gray-400">
               {Array.from({ length: totalSteps }).map((_, index) => (
                <div key={index}
                className={`flex items-center ${index + 1 <= currentStep ? "text-blue-600" : ""}`}
                >
                  <CheckCircle2 className="w-4 h-4 mr-1" />
                  Step {index + 1}
                </div>
               ))}
              </div>
            </div>
          </div>
          {content}
        </div>
    )
}