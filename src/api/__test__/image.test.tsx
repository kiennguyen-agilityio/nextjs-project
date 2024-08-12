import { uploadImage } from '../image';

global.fetch = jest.fn();

describe('uploadImage', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  it('should upload image successfully and return URL', async () => {
    const mockUrl = 'https://example.com/uploaded-image.jpg';
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({ data: { url: mockUrl } }),
    };
    (fetch as jest.Mock).mockResolvedValue(mockResponse);

    const formData = new FormData();
    formData.append('file', new Blob());

    const url = await uploadImage(formData);

    expect(fetch).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_UPLOAD_URL}?key=${process.env.NEXT_PUBLIC_UPLOAD_KEY}`,
      {
        method: 'POST',
        body: formData,
      },
    );
    expect(url).toBe(mockUrl);
  });

  it('should throw an error if the response is not ok', async () => {
    const mockResponse = {
      ok: false,
      json: jest.fn(),
    };
    (fetch as jest.Mock).mockResolvedValue(mockResponse);

    const formData = new FormData();
    formData.append('file', new Blob());

    await expect(uploadImage(formData)).rejects.toThrow(
      new Error('Failed to upload image'),
    );
  });

  it('should throw an error if fetch fails', async () => {
    (fetch as jest.Mock).mockRejectedValue(new Error('Network error'));

    const formData = new FormData();
    formData.append('file', new Blob());

    await expect(uploadImage(formData)).rejects.toThrow();
  });
});
