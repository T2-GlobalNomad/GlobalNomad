'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Modal from 'react-modal';
import KakaoSignUpForm from './components/KakaoSignUpForm';
import toast from 'react-hot-toast';

Modal.setAppElement('body'); // 접근성(A11Y)을 위한 설정 (Next.js 기본 루트 엘리먼트)

export default function KakaoSignUpCallbackPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const code = searchParams.get('code');

  const [modaleIsOpen, setModalIsOpen] = useState(true);

  useEffect(() => {
    if (!code) {
      toast.error('인가 코드가 없습니다.');
      setTimeout(() => {
        router.push('/signup');
      }, 1500);
      setModalIsOpen(false);
    }
  }, [code, router]);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <Modal
        isOpen={modaleIsOpen}
        shouldCloseOnOverlayClick={false}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel='카카오 회원가입'
        style={{
          overlay: { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
          content: {
            maxWidth: '400px',
            maxHeight: '600px',
            margin: '100px auto',
            padding: '20px',
          },
        }}
      >
        <KakaoSignUpForm code={code!} />
      </Modal>
    </div>
  );
}
