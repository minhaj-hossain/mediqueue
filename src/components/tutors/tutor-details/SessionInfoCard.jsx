import { CalendarDays } from 'lucide-react';
import { InfoCard, Row } from './ui-helpers';

function SessionInfoCard({ tutor, sessionDate }) {
    return (
        <InfoCard title="Session Info" icon={<CalendarDays size={18} />}>
            <div className="space-y-2 text-sm">
                <Row
                    label="Start Date"
                    value={sessionDate?.toLocaleDateString('en-GB', {
                        day: 'numeric', month: 'long', year: 'numeric'
                    })}
                />
                <Row label="Hourly Fee" value={`৳ ${tutor.hourlyFee}`} highlight />
                <Row label="Total Slots" value={tutor.totalSlot} />
                <Row label="Mode" value={tutor.teachingMode} />
            </div>
        </InfoCard>
    );
}

export default SessionInfoCard;