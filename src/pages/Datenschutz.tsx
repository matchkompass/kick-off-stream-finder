import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Datenschutz = () => (
  <div className="min-h-screen bg-gray-50 py-8">
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
      <Card>
        <CardHeader>
          <CardTitle>Datenschutzerklärung</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-gray-800">
          <div>
            <strong>Verantwortliche Stelle im Sinne der Datenschutzgesetze:</strong>
            <br />
            Alexander Schmidt<br />
            David Aschauer<br />
            Boddinstr. 6<br />
            12053 Berlin<br />
          </div>
          <div>
            <strong>Allgemeiner Hinweis und Pflichtinformationen</strong>
            <p>Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.</p>
          </div>
          <div>
            <strong>Erfassung allgemeiner Informationen</strong>
            <p>Beim Zugriff auf diese Website werden automatisch Informationen allgemeiner Natur erfasst. Diese Informationen (Server-Logfiles) beinhalten etwa die Art des Webbrowsers, das verwendete Betriebssystem, den Domainnamen Ihres Internet-Service-Providers und Ähnliches. Hierbei handelt es sich ausschließlich um Informationen, welche keine Rückschlüsse auf Ihre Person zulassen.</p>
          </div>
          <div>
            <strong>Ihre Rechte</strong>
            <p>Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung sowie ein Recht auf Berichtigung, Sperrung oder Löschung dieser Daten.</p>
          </div>
          <div>
            <strong>Kontakt</strong>
            <p>Für Fragen zum Datenschutz wenden Sie sich bitte an: <a href="mailto:info@matchkompass.de" className="text-blue-600 underline">info@matchkompass.de</a></p>
          </div>
          <div className="text-xs text-gray-500">
            Quelle: <a href="https://www.e-recht24.de" className="underline">e-recht24.de</a>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);

export default Datenschutz; 