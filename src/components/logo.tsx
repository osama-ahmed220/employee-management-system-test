import LogoSVG from '../../public/assets/images/logo.svg';

const Logo = () => {

    return (
        <div className='flex items-center justify-center'>
            <LogoSVG className="!w-10 !h-10 fill-gray-400" />
            <h3 className='text-lg font-bold ml-4'>EMS</h3>
        </div>
    );
};

export default Logo;