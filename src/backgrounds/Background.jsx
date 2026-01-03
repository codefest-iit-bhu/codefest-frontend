export default function Background({ image_path }) {
    return (
        <>
            <img
                alt="codefest"
                src={image_path}
                width={0}
                height={0}
                className="absolute inset-0 w-screen h-screen object-cover object-center z-[-1]"
            />
        </>
    );
}