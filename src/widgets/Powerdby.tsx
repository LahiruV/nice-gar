interface PowerdByProps {
    isFull: boolean;
}

export const PowerdBy = ({ isFull }: PowerdByProps) => {
    return (
        <>
            {isFull ?
                <div className="text-center text-gray-400">
                    <a href="#">&copy; {new Date().getFullYear()} Powered by <u>Entry X</u></a>
                </div>
                :
                <div className="text-center text-gray-400">
                    <a href="#">&copy; Powered by <u>Entry X</u></a>
                </div>
            }
        </>
    );
};