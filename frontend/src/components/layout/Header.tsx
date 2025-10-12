import { JSX } from 'react';
import Image from 'next/image';
import { ContainerWrapper } from './ContainerWrapper';

export function Header(): JSX.Element {
  return (
    <header style={{padding: '24px 0' }}>
      <ContainerWrapper  >
        <Image
          src="/images/logo_estacio.png"
          alt="Logo da empresa"
          width={158.33}
          height={40}
          priority
        />
      </ContainerWrapper>
    </header>
  );
}
