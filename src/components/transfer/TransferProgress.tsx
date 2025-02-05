import React from 'react';
import { Check, Clock, ArrowRight } from 'lucide-react';

type Step = 'details' | 'review' | 'complete';

export default function TransferProgress({ currentStep }: { currentStep: Step }) {
  const steps = [
    { id: 'details', label: 'Details', icon: Clock },
    { id: 'review', label: 'Review', icon: ArrowRight },
    { id: 'complete', label: 'Complete', icon: Check }
  ];

  return (
    <div className="flex items-center justify-center mb-8">
      {steps.map((step, index) => {
        const Icon = step.icon;
        const isActive = step.id === currentStep;
        const isComplete = steps.findIndex(s => s.id === currentStep) >= index;
        const isLastComplete = currentStep === 'complete' && step.id === 'complete';

        return (
          <React.Fragment key={step.id}>
            {index > 0 && (
              <div className={`h-1 w-16 mx-2 ${
                isComplete || isLastComplete 
                  ? 'bg-blue-500 dark:bg-blue-400' 
                  : 'bg-gray-200 dark:bg-gray-700'
              }`} />
            )}
            <div className={`flex flex-col items-center ${
              isActive ? isLastComplete ? 'text-green-500' : 'text-blue-600' : 
              isComplete ? 'text-green-500' : 
              'text-gray-400'
            }`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                isActive 
                  ? isLastComplete 
                    ? 'bg-green-100 dark:bg-green-900/50 text-green-500 dark:text-green-400' 
                    : 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400' 
                  : isComplete 
                    ? 'bg-green-100 dark:bg-green-900/50 text-green-500 dark:text-green-400' 
                    : 'bg-gray-100 dark:bg-gray-800'
              }`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-sm mt-2">{step.label}</span>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
}
