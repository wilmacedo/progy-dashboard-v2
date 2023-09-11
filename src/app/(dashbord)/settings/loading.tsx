import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export default function Loading() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h2 className="mb-1 text-xl font-semibold">Informação pessoal</h2>
        <p className=" text-sm text-muted-foreground">
          Atualize e revise suas informações pessoais
        </p>
      </div>
      <Separator />

      <div className="space-y-8 max-w-3xl">
        {new Array(3).fill(0).map((_, i) => (
          <div className="grid grid-cols-2" key={i}>
            <div className="flex flex-col justify-center space-y-1 gap-2">
              <div className="h-[1rem] w-[5rem] bg-border rounded-md animate-pulse" />
              <div className="h-[1rem] w-[8rem] bg-border rounded-md animate-pulse" />
            </div>

            <div className="h-[2rem] w-full bg-border rounded-md animate-pulse" />
          </div>
        ))}

        <div className="w-full flex items-center justify-end">
          <Button disabled>Atualizar</Button>
        </div>
      </div>
    </div>
  );
}
