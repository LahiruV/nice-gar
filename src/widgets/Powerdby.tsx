interface PowerdByProps {
    isFull: boolean;
}

export const PowerdBy = ({ isFull }: PowerdByProps) => {
    return (
        <>
            {isFull ?
                <div className="text-center text-gray-400">
                    <a href="https://zenra-technologies.netlify.app/">&copy; {new Date().getFullYear()} Powered by <u>Zenra Technologies</u></a>
                </div>
                :
                <div className="text-center text-gray-400">
                    <a href="https://zenra-technologies.netlify.app/">&copy; Powered by <u>Zenra Technologies</u></a>
                </div>
            }
        </>
    );
};