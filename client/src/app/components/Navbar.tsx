

export default function Navbar() {
    return (
        <div className="absolute right-5 z-30">
        <button
            className="w-10 h-10 bg-black rounded-full flex flex-col justify-center items-center"
        >
            <div className="w-3 h-0.5 bg-white mb-1" />
            <div className="w-3 h-0.5 bg-white" />
        </button>
        </div>
    );
}