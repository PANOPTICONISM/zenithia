import { AddBoxOutlined } from '@mui/icons-material';
import { Button, Stack } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { SearchBar } from '../SearchBar/SearchBar';
import { highlight } from '../../App';
import { HeaderProps } from './Header.types';

const Header = ({ title, handleClick, buttonText, isSearch = false, hideMargin = false }: HeaderProps) => {
  const mobileBreakpoint = useMediaQuery('(max-width:500px)');
  const tabletBreakpoint = useMediaQuery('(max-width:900px)');

  return (
    <header style={ !tabletBreakpoint ? { display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' } : undefined}>
      <h1 style={{ fontSize: '48px', marginTop: 0, marginBottom: hideMargin ? 0 : '32px' }}>{title}</h1>
      {buttonText ? 
        <Stack direction={mobileBreakpoint ? 'column' : 'row'} spacing={2} paddingBottom="16px" justifyContent="flex-end">
          {isSearch ? <SearchBar /> : null}
          <Button 
            sx={{ background: highlight, fontWeight: 'bold' }}
            variant='contained' 
            onClick={handleClick} 
            startIcon={<AddBoxOutlined />}>{buttonText}</Button>
        </Stack> : null}
    </header>
  );
};

export default Header;