
interface RouteParams {
    params: Promise<{ step: number }>;
}

export default async function Onboarding({ params }: RouteParams) {
    const { step } = await params;
    console.log(step);
    return(
    <div>Onboarding</div>
    )
}