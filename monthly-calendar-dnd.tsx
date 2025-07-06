import {
  Bird,
  BookOpen,
  Cake,
  Film,
  Gamepad2,
  Heart,
  Menu,
  Moon,
  Music,
  Palette,
  Piano,
  School,
  TreePine,
  Trophy,
  Users,
  X
} from 'lucide-react';
import { useState } from 'react';

// Event types with icons and colors
const eventTypes = [
  { id: 'dance', name: 'Dance', icon: Music, color: 'bg-pink-500' },
  { id: 'swans', name: 'Swans', icon: Bird, color: 'bg-blue-500' },
  { id: 'nanna', name: 'Nanna Visit', icon: Heart, color: 'bg-red-500' },
  { id: 'family', name: 'Family Day', icon: Users, color: 'bg-green-500' },
  { id: 'sports', name: 'Sports', icon: Trophy, color: 'bg-orange-500' },
  { id: 'piano', name: 'Piano Lesson', icon: Piano, color: 'bg-purple-500' },
  { id: 'birthday', name: 'Birthday Party', icon: Cake, color: 'bg-yellow-500' },
  { id: 'school', name: 'School Event', icon: School, color: 'bg-indigo-500' },
  { id: 'movie', name: 'Movie Night', icon: Film, color: 'bg-gray-500' },
  { id: 'sleepover', name: 'Sleepover', icon: Moon, color: 'bg-purple-600' },
  { id: 'art', name: 'Art Class', icon: Palette, color: 'bg-pink-600' },
  { id: 'gaming', name: 'Gaming', icon: Gamepad2, color: 'bg-green-600' },
  { id: 'library', name: 'Library', icon: BookOpen, color: 'bg-blue-600' },
  { id: 'park', name: 'Park Day', icon: TreePine, color: 'bg-green-700' }
];

// Helper function to get event type by id
const getEventType = (eventId) => {
  return eventTypes.find(e => e.id === eventId);
};

// Draggable Event Component
const DraggableEvent = ({ event, compact = false }) => {
  const [isDragging, setIsDragging] = useState(false);
  const Icon = event.icon;

  const handleDragStart = (e) => {
    setIsDragging(true);
    e.dataTransfer.setData('eventId', event.id);
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  if (compact) {
    return (
      <div
        draggable
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        className={`${event.color} text-white p-2 rounded cursor-move transition-all inline-flex items-center gap-1 ${isDragging ? 'opacity-50 scale-95' : 'hover:scale-105'
          }`}
      >
        <Icon className="w-3 h-3" />
        <span className="text-xs">{event.name}</span>
      </div>
    );
  }

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className={`${event.color} text-white p-2 rounded cursor-move transition-all ${isDragging ? 'opacity-50 scale-95' : 'hover:scale-105'
        }`}
    >
      <Icon className="w-4 h-4 mx-auto" />
      <p className="text-xs text-center font-medium mt-1">{event.name}</p>
    </div>
  );
};

// Calendar Day Component
const CalendarDay = ({ day, events, onDropEvent, onRemoveEvent }) => {
  const [isOver, setIsOver] = useState(false);
  const isToday = day === new Date().getDate();

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsOver(true);
  };

  const handleDragLeave = () => {
    setIsOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsOver(false);

    const eventId = e.dataTransfer.getData('eventId');
    if (eventId) {
      onDropEvent(day, eventId);
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`border rounded p-1 min-h-[60px] md:min-h-[80px] transition-all ${isOver ? 'bg-blue-50 border-blue-400' : 'border-gray-200'
        } ${isToday ? 'bg-yellow-50' : 'bg-white'}`}
    >
      <div className="flex justify-between items-center mb-1">
        <span className={`text-xs font-semibold ${isToday ? 'text-yellow-700' : 'text-gray-700'}`}>
          {day}
        </span>
        {isToday && <span className="text-xs bg-yellow-200 text-yellow-800 px-1 rounded">Today</span>}
      </div>
      <div className="space-y-0.5">
        {events.map((eventId, index) => {
          const event = getEventType(eventId);
          if (!event) return null;

          const Icon = event.icon;
          return (
            <div
              key={`${eventId}-${index}`}
              className={`${event.color} text-white p-0.5 rounded flex items-center gap-0.5 cursor-pointer hover:opacity-80`}
              onClick={() => onRemoveEvent(day, index)}
            >
              <Icon className="w-3 h-3 flex-shrink-0" />
              <span className="text-xs truncate">{event.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Main Calendar Component
const MonthlyCalendar = () => {
  const [calendarEvents, setCalendarEvents] = useState({});
  const [showActivities, setShowActivities] = useState(false);
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
  const currentYear = currentDate.getFullYear();

  // Get days in current month
  const daysInMonth = new Date(currentYear, currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentDate.getMonth(), 1).getDay();

  const handleDropEvent = (day, eventId) => {
    setCalendarEvents(prev => ({
      ...prev,
      [day]: [...(prev[day] || []), eventId]
    }));
  };

  const handleRemoveEvent = (day, eventIndex) => {
    setCalendarEvents(prev => ({
      ...prev,
      [day]: prev[day].filter((_, index) => index !== eventIndex)
    }));
  };

  // Create calendar grid
  const calendarDays = [];
  const totalCells = Math.ceil((daysInMonth + firstDayOfMonth) / 7) * 7;

  for (let i = 0; i < totalCells; i++) {
    const dayNumber = i - firstDayOfMonth + 1;
    if (dayNumber > 0 && dayNumber <= daysInMonth) {
      calendarDays.push(dayNumber);
    } else {
      calendarDays.push(null);
    }
  }

  return (
    <div className="max-w-full md:max-w-2xl mx-auto p-3 bg-gray-50 min-h-screen">
      <h1 className="text-xl md:text-2xl font-bold text-center mb-4 text-gray-800">
        {currentMonth} {currentYear}
      </h1>

      {/* Mobile Activity Toggle */}
      <div className="md:hidden mb-4">
        <button
          onClick={() => setShowActivities(!showActivities)}
          className="w-full bg-white rounded-lg shadow p-3 flex items-center justify-between"
        >
          <span className="font-semibold text-gray-700">Activities</span>
          {showActivities ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Activities Drawer */}
      {showActivities && (
        <div className="md:hidden bg-white rounded-lg shadow p-3 mb-4">
          <div className="grid grid-cols-2 gap-2">
            {eventTypes.map(event => (
              <DraggableEvent key={event.id} event={event} compact={true} />
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-3 text-center">
            Drag to calendar days
          </p>
        </div>
      )}

      <div className="flex gap-4">
        {/* Desktop Event Sidebar */}
        <div className="hidden md:block w-36 bg-white rounded-lg shadow p-3">
          <h2 className="text-sm font-semibold mb-3 text-gray-700">Activities</h2>
          <div className="space-y-2">
            {eventTypes.map(event => (
              <DraggableEvent key={event.id} event={event} />
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-3 text-center">
            Drag to days
          </p>
        </div>

        {/* Calendar Grid */}
        <div className="flex-1 bg-white rounded-lg shadow p-3">
          {/* Day headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, idx) => (
              <div key={idx} className="text-center font-semibold text-xs text-gray-600">
                <span className="hidden sm:inline">{['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][idx]}</span>
                <span className="sm:hidden">{day}</span>
              </div>
            ))}
          </div>

          {/* Calendar days */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day, index) => (
              <div key={index}>
                {day ? (
                  <CalendarDay
                    day={day}
                    events={calendarEvents[day] || []}
                    onDropEvent={handleDropEvent}
                    onRemoveEvent={handleRemoveEvent}
                  />
                ) : (
                  <div className="border border-transparent" />
                )}
              </div>
            ))}
          </div>

          <p className="text-xs text-gray-500 mt-3 text-center">
            Tap events to remove
          </p>
        </div>
      </div>
    </div>
  );
};

export default MonthlyCalendar;