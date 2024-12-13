export default function Background({ image_path }) {
    return (
        <>
            <img
                src={image_path}
                width={0}
                height={0}
                className="absolute h-[100vh] lg:h-auto w-fit md:w-[100vw] object-cover lg:-mt-[20vh] xl:-mt-[35vh] z-[-1]"
            />
        </>
    );
}
