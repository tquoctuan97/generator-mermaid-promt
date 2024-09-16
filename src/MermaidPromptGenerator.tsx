import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ClipboardCopy } from "lucide-react";
import React, { useState } from "react";

const diagramTypes = [
  "flowchart",
  "sequence diagram",
  "class",
  "state",
  "entity-relationship",
  "gantt",
  "pie",
  "user journey",
  "git graph",
  "mindmap",
];

const detailLevels = ["basic", "intermediate", "detailed"];

const MermaidPromptGenerator = () => {
  const [formData, setFormData] = useState({
    diagramType: "sequence diagram",
    selection: "",
    detailLevel: "intermediate",
    notes: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const generatePrompt = () => {
    return `You are a software engineer. Write a **Mermaid ${
      formData.diagramType
    }** to illustrate the following:  
**Scenario:** """${formData.selection}"""

**Diagram Type:** ${formData.diagramType}

**Level of Detail:** ${formData.detailLevel}

**Output:**
  1. Provide the Mermaid ${formData.diagramType} code.
  2. Include a brief explanation of the diagram.

${formData.notes ? `Notes: ${formData.notes}` : ""}
`;
  };

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(generatePrompt())
      .then(() => alert("Prompt copied to clipboard!"))
      .catch((err) => console.error("Failed to copy: ", err));
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Mermaid Prompt Generator</h1>
      <form className="space-y-4">
        <div>
          <label className="block mb-1">Diagram Type:</label>
          <Select
            name="diagramType"
            value={formData.diagramType}
            onValueChange={(value) =>
              setFormData((prev) => ({ ...prev, diagramType: value }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {diagramTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="block mb-1">Selection:</label>
          <Textarea
            name="selection"
            value={formData.selection}
            onChange={handleInputChange}
            placeholder="Describe what to illustrate"
          />
        </div>
        <div>
          <label className="block mb-1">Level of Detail:</label>
          <Select
            name="detailLevel"
            value={formData.detailLevel}
            onValueChange={(value) =>
              setFormData((prev) => ({ ...prev, detailLevel: value }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {detailLevels.map((level) => (
                <SelectItem key={level} value={level}>
                  {level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="block mb-1">Notes:</label>
          <Textarea
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
            placeholder="Any additional notes or context"
          />
        </div>

        <Button onClick={copyToClipboard} type="button">
          <ClipboardCopy className="mr-2 h-4 w-4" />
          Copy Prompt
        </Button>

        <Card className="p-4">
          <pre className="whitespace-pre-wrap">{generatePrompt()}</pre>
        </Card>
      </form>
    </div>
  );
};

export default MermaidPromptGenerator;
