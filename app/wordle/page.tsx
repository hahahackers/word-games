import { Input, Table } from '@/app/wordle/components';

export const metadata = {
  title: 'Word Games / Wordle',
};

export default function Page() {
  return (
    <main className="m-24 flex flex-col">
      <Input />
      <Table />
    </main>
  );
}
