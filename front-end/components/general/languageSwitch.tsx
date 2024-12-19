import { useRouter } from 'next/router';

const LanguageSwitch: React.FC = () => {
    const router = useRouter();
  
    const handleLanguageChange = (event: { target: { value: string } }) => {
      const newLocale = event.target.value;
      const { pathname, asPath, query } = router;
      router.push({ pathname, query }, asPath, { locale: newLocale });
    };
  
    return (
      <div className="fixed top-4 right-4 z-10">
        {router.locales && (
          <select
            name="locale" 
            id="locale"
            value={router.locale}
            onChange={handleLanguageChange}
            className="text-black rounded-lg p-1 bg-white"
          > 
            {router.locales.map((locale, index) => (
              <option key={index} value={locale}>{locale.toUpperCase()}</option>
            ))}
          </select>
        )}
      </div>
    );
  };
  
  export default LanguageSwitch;