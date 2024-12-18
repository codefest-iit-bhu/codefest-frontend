export default function Background({ image_path }) {
    return (
        <>
            <img
                src={image_path}
                width={0}
                height={0}
                className="absolute top-0 left-0 h-[100vh] lg:h-[110vh] xl:h-[125vh] w-fit md:w-[100vw] object-cover lg:-mt-[10vh] xl:-mt-[25vh] z-[-1] overflow-y-hidden"
            />
        </>
    );
}
