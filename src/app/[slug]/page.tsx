import { supabase } from '@/lib/supabaseClient';
import KhmerLuxuryGold from '@/components/templates/KhmerLuxuryGold';

interface Props {
  params: { slug: string };
  searchParams: { to?: string };
}

export default async function Page({ params, searchParams }: Props) {
  const slug = params?.slug;
  const to = searchParams?.to;

  const { data: invitation } = await supabase
    .from('invitations')
    .select('*')
    .eq('slug', slug)
    .single();

  const mockData = {
    groom_name: 'គីមស៊ុន',
    groom_title: 'កូនប្រុសច្បង',
    bride_name: 'ចាន់ណេត',
    bride_title: 'កូនស្រីពៅ',
    groom_father: 'លោកឪពុក ស៊ុន ហេង',
    groom_mother: 'អ្នកម្តាយ សុខ ផល្លា',
    bride_father: 'លោកឪពុក ចាន់ ថុល',
    bride_mother: 'អ្នកម្តាយ ម៉ៅ សុភី',
    event_date: '2026-11-15',
    khmer_date: 'ត្រូវនឹងថ្ងៃអាទិត្យ ៥កើត ខែកត្តិក ឆ្នាំរោង ព.ស. ២៥៦៨',
    location_name: 'មជ្ឈមណ្ឌលសន្និបាត ឌឹ ព្រេមៀ សែនសុខ (អគារ A)',
    location_address: 'ផ្លូវ 1003, សង្កាត់ភ្នំពេញថ្មី, ខណ្ឌសែនសុខ, រាជធានីភ្នំពេញ',
    bank_name: 'ABA Bank',
    bank_account_name: 'KIMSUN & CHANNET',
    bank_account_number: '001 234 567',
  };

  return (
    <main className="min-h-screen bg-stone-900 flex justify-center items-center p-0 md:p-6">
      <KhmerLuxuryGold
        invitation={invitation || mockData}
        guestName={to || 'ឯកឧត្តម លោកជំទាវ លោក លោកស្រី អ្នកនាងកញ្ញា'}
      />
    </main>
  );
}