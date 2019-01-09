import generateImage from './generateImage';

export default async ctx => {
  if (ctx.platform === 'line') {
    if (ctx.event.isImage) {
      if (ctx.state.lineImageId) {
        await ctx.sendText('Are you trying to replace the former profile pic?');
        // TODO: Yes or NO
      } else {
        ctx.setState({ lineImageId: ctx.event.image.id, inputingText: true });
        await ctx.sendText(`Input the wording you want:`);
        // TODO: suggested length
      }
    } else if (ctx.state.inputingText) {
      if (ctx.event.isText) {
        const link = await generateImage({
          lineMessageId: ctx.state.lineImageId,
          text: ctx.event.text,
        });
        ctx.resetState();
        await ctx.sendImage({ originalContentUrl: link });
        // TODO: finish wording
      } else {
        await ctx.sendText(
          `I don't get it, would you plz try input the wording you want (on your profile pic):`
        );
      }
    } else {
      await ctx.sendText(`Upload your profile pic, and I'll make you pro.`);
      await ctx.sendText(
        `Plz cut your own pic into square, upload it, and I'll handle the rest`
      );
    }
  }
};
