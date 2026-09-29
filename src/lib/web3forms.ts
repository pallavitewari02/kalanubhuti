export async function submitWeb3Form(
  subject: string,
  fields: Record<string, string>,
  file?: File | null,
) {
  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
  if (!accessKey) {
    throw new Error('The form is not connected yet.');
  }

  const body = new FormData();
  body.append('access_key', accessKey);
  body.append('subject', subject);
  for (const [name, value] of Object.entries(fields)) {
    body.append(name, value);
  }
  if (file) body.append('attachment', file, file.name);

  const response = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    body,
  });
  const result = (await response.json()) as { success?: boolean; message?: string };
  if (!response.ok || !result.success) {
    throw new Error(result.message || 'The message could not be sent.');
  }
}
