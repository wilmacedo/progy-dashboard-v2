import { Logo } from '@/components/logo';
import { SigninForm } from './signin-form';

export default function Page() {
  return (
    <div className="pt-4 md:pt-0 px-4 bg-accent dark:bg-background w-screen h-screen flex flex-col md:px-0 md:items-center md:justify-center">
      <div className="space-y-8">
        <div className="flex items-center gap-2">
          <Logo className="w-8 h-8" />
          <h3 className="font-bold text-md tracking-widest whitespace-nowrap">
            PROGY
          </h3>
        </div>

        <div>
          <h2 className="font-medium text-2xl">Entrar</h2>
          <p className="text-muted-foreground">Entre na sua conta via email</p>
        </div>

        <div className="py-6 w-full md:p-6 md:bg-white md:w-[25rem] md:border border-white rounded-lg md:shadow-md dark:bg-background dark:border-border">
          <SigninForm />
        </div>
      </div>
    </div>
  );
}
