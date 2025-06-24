
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface FAQProps {
  questions: Array<{
    question: string;
    answer: string;
  }>;
  title: string;
}

export const FAQ = ({ questions, title }: FAQProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>Häufig gestellte Fragen</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {questions.map((faq, index) => (
            <div key={index} className="border rounded-lg">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full text-left p-3 flex items-center justify-between hover:bg-gray-50"
              >
                <span className="font-medium text-sm md:text-base">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-3 pb-3 text-sm md:text-base text-gray-600">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
