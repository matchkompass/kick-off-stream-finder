import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Impressum = () => (
  <div className="min-h-screen bg-gray-50 py-8">
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
      <Card>
        <CardHeader>
          <CardTitle>Impressum</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-gray-800">
          <div>
            <strong>Angaben gemäß § 5 TMG</strong>
            <br />
            Alexander Schmidt<br />
            David Aschauer<br />
            Boddinstr. 6<br />
            12053 Berlin<br />
          </div>
          <div>
            <strong>Vertreten durch:</strong>
            <br />
            Alexander Schmidt, David Aschauer
          </div>
          <div>
            <strong>Kontakt:</strong>
            <br />
            E-Mail: <a href="mailto:info@matchkompass.de" className="text-blue-600 underline">info@matchkompass.de</a>
          </div>
          <div>
            <strong>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV:</strong>
            <br />
            Alexander Schmidt<br />
            Boddinstr. 6<br />
            12053 Berlin
          </div>
          <div className="text-xs text-gray-500">
            Quelle: <a href="https://www.e-recht24.de" className="underline">e-recht24.de</a>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);

export default Impressum; 