import { Clock } from 'lucide-react';
import { InfoCard } from './ui-helpers';

function AvailabilityCard({ availableDays, availableTimeStart, availableTimeEnd }) {
    return (
        <InfoCard title="Availability" icon={<Clock size={18} />}>
            <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                    {(availableDays || []).map(day => (
                        <span key={day} className="rounded-lg bg-teal-50 px-3 py-1 text-sm font-bold text-teal-700">
                            {day}
                        </span>
                    ))}
                </div>
                {availableTimeStart && (
                    <p className="text-sm font-medium text-muted-foreground">
                        {availableTimeStart} – {availableTimeEnd}
                    </p>
                )}
            </div>
        </InfoCard>
    );
}

export default AvailabilityCard;